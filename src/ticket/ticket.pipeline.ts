import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class DynamicValidationPipe implements PipeTransform {
  constructor(private readonly dtoMap: Record<number, any>) {}

  async transform(value: any) {
    const { subcategory } = value;

    if (!this.dtoMap[subcategory]) {
      throw new BadRequestException(
        `Invalid category or subcategory: ${subcategory}`,
      );
    }

    const DTOClass = this.dtoMap[subcategory];
    const object = plainToInstance(DTOClass, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const simplifiedErrors = this.formatValidationErrors(errors);
      throw new BadRequestException(simplifiedErrors);
    }

    return object;
  }

  private formatValidationErrors(errors: ValidationError[]): string[] {
    const messages: string[] = [];

    errors.forEach((error) => {
      if (error.constraints) {
        messages.push(...Object.values(error.constraints));
      }

      if (error.children && error.children.length > 0) {
        messages.push(...this.formatValidationErrors(error.children));
      }
    });

    return messages;
  }
}
