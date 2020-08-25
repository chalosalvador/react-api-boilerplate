/**
 * Created by chalosalvador on 2019-01-19
 */

export const hasErrors = ( fieldsError ) => {
  return Object.keys( fieldsError ).some( field => fieldsError[ field ] );
};

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

export const normalizeString = ( string ) => (
  string
    .trim()
    .toLowerCase()
    .replace('á', 'a')
    .replace('Á', 'A')
    .replace('é', 'e')
    .replace('É', 'E')
    .replace('í', 'i')
    .replace('Í', 'I')
    .replace('ó', 'o')
    .replace('Ó', 'O')
    .replace('ú', 'u')
    .replace('Ú', 'U')
    .replace('ñ', 'n')
    .replace('Ñ', 'N')
);