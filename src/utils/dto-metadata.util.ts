import { plainToInstance } from 'class-transformer';
import { getMetadataStorage } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface DtoFieldMetadata {
  name: string;
  type: string;
  uiType: string; // New field for UI input type
  required: boolean;
  example?: any;
  description?: string;
  enum?: any[];
  minLength?: number;
  maxLength?: number;
  isArray?: boolean;
  nestedType?: string;
}

export function getDtoMetadata(dto: any): DtoFieldMetadata[] {
  const metadataStorage = getMetadataStorage();
  const validationMetadatas = metadataStorage.getTargetValidationMetadatas(
    dto, // Target constructor
    null, // Schema name (usually null)
    true, // Always include metadata
    false, // Don't use strict group filtering
  );

  const fields: DtoFieldMetadata[] = [];

  // Create an instance of the DTO with default values
  const dtoInstance = plainToInstance(dto, {});

  for (const key of Object.keys(dtoInstance)) {
    const fieldMetadata: DtoFieldMetadata = {
      name: key,
      type: 'unknown',
      uiType: 'input', // Default to 'input'
      required: false,
    };
    console.log("🚀 ~ getDtoMetadata ~ fieldMetadata:", fieldMetadata)

    // Get @ApiProperty() metadata
    const apiProperties = Reflect.getMetadata(
      'swagger/apiModelPropertiesArray',
      dto.prototype,
    );

    if (apiProperties) {
      const apiProperty = apiProperties.find((prop: any) => prop.name === key);
      if (apiProperty) {
        fieldMetadata.type = apiProperty.type || 'unknown';
        fieldMetadata.example = apiProperty.example;
        fieldMetadata.description = apiProperty.description;
        fieldMetadata.enum = apiProperty.enum;
        fieldMetadata.minLength = apiProperty.minLength;
        fieldMetadata.maxLength = apiProperty.maxLength;
        fieldMetadata.isArray = apiProperty.isArray;
      }
    }

    // Get validation metadata
    const validationMetadata = validationMetadatas.filter(
      (meta: any) => meta.propertyName === key,
    );

    // Check for @IsArray()
    const isArrayMetadata = validationMetadata.find(
      (meta: any) => meta.name === 'isArray',
    );
    if (isArrayMetadata) {
      fieldMetadata.isArray = true;
    }

    // Check for @ArrayMinSize()
    const arrayMinSizeMetadata = validationMetadata.find(
      (meta: any) => meta.name === 'arrayMinSize',
    );
    if (arrayMinSizeMetadata) {
      fieldMetadata.minLength = arrayMinSizeMetadata.constraints[0];
    }

    // Check for @IsNotEmpty()
    const isNotEmptyMetadata = validationMetadata.find(
      (meta: any) => meta.name === 'isNotEmpty',
    );
    if (isNotEmptyMetadata) {
      fieldMetadata.required = true;
    }

    // Check for @IsString()
    const isStringMetadata = validationMetadata.find(
      (meta: any) => meta.name === 'isString',
    );
    if (isStringMetadata) {
      fieldMetadata.type = 'string';
    }

    // Handle nested types (e.g., @Type(() => SomeClass))
    const typeMetadata = Reflect.getMetadata('design:type', dto.prototype, key);
    if (typeMetadata) {
      fieldMetadata.type = typeMetadata.name.toLowerCase();
    }

    // Determine UI input type based on field type and metadata
    if (fieldMetadata.enum) {
      fieldMetadata.uiType = 'dropdown'; // Use dropdown for enum fields
    } else if (fieldMetadata.type === 'boolean') {
      fieldMetadata.uiType = 'checkbox'; // Use checkbox for boolean fields
    } else if (
      fieldMetadata.type === 'date' ||
      (fieldMetadata.type === 'string' && fieldMetadata.example?.includes('-'))
    ) {
      fieldMetadata.uiType = 'datepicker'; // Use datepicker for date fields
    } else if (fieldMetadata.isArray) {
      fieldMetadata.uiType = 'multiselect'; // Use multiselect for array fields
    } else if (fieldMetadata.type === 'number') {
      fieldMetadata.uiType = 'number'; // Use number input for numeric fields
    } else {
      fieldMetadata.uiType = 'input'; // Default to input for other fields
    }

    fields.push(fieldMetadata);
  }

  return fields;
}
