import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ApiResponse as ApiResponseModel } from '~common/utils/base.response';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ApiResponseSchema = <T extends Type<unknown>>(
  model?: T,
  isArray = false
) =>
  applyDecorators(
    model
      ? ApiExtraModels(ApiResponseModel, model)
      : ApiExtraModels(ApiResponseModel),
    ApiResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(ApiResponseModel)
          },
          {
            properties: {
              correlationId: {
                type: 'string',
                format: 'uuid'
              },
              result: model
                ? {
                    $ref: isArray ? null : getSchemaPath(model),
                    type: isArray ? 'array' : 'object',
                    items: isArray ? { $ref: getSchemaPath(model) } : null
                  }
                : { default: null }
            }
          }
        ]
      }
    })
  );
