import { plainToInstance, Type } from 'class-transformer';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';
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

    // Get @ApiProperty() metadata
    const apiProperty = Reflect.getMetadata(
      'swagger/apiModelPropertiesArray',
      dto.prototype,
    )?.find((prop: any) => prop.name === key);
    if (apiProperty) {
      fieldMetadata.type = apiProperty.type;
      fieldMetadata.example = apiProperty.example;
      fieldMetadata.description = apiProperty.description;
      fieldMetadata.enum = apiProperty.enum;
      fieldMetadata.minLength = apiProperty.minLength;
      fieldMetadata.maxLength = apiProperty.maxLength;
      fieldMetadata.isArray = apiProperty.isArray;
    }

    // Get @IsNotEmpty() and other validation metadata
    const validationMetadata = validationMetadatas.filter(
      (meta: ValidationMetadata) => meta.propertyName === key,
    );

    if (
      validationMetadata.some(
        (meta: ValidationMetadata) => meta.name === 'isNotEmpty',
      )
    ) {
      fieldMetadata.required = true;
    }

    const enumMetadata = validationMetadata.find(
      (meta: ValidationMetadata) => meta.name === 'isEnum',
    );
    
    if (enumMetadata) {
      const enumConstraint = enumMetadata.constraints.find(
        (constraint: any) => Array.isArray(constraint)
      );
      if (enumConstraint) {
        fieldMetadata.enum = enumConstraint;
      }
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
