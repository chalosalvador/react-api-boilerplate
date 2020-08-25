import { List } from 'antd';
import React from 'react';

const ErrorList = ( { errors } ) => <List size='small'
                                          dataSource={ Object.values( errors )
                                            .map( ( errorMessage ) => errorMessage ) }
                                          renderItem={ item => <List.Item>{ item }</List.Item> }
/>;

export default ErrorList;
