import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import BasicDatePicker from './datePicker';

const cn = classNames.bind(styles);

export default function DateCollection() {
  return (
    <div>
      <h2 className={cn('')}>DateCollection</h2>
      <Card className={cn('card')}>
        <CardContent>
          <BasicDatePicker />
        </CardContent>
      </Card>
    </div>
  );
}
