'use client';

import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';

const cn = classNames.bind(styles);
const TIME_FORMAT = 'YYYY-MM-DD';

export default function BasicDatePicker() {
  const [selectedDates, setSelectedDates] = useState<dayjs.Dayjs[]>([]);

  const handleChange = (value: dayjs.Dayjs) => {
    if (value) {
      setSelectedDates((prevDates) => [...prevDates, value]);
    }
  };

  const handleDelete = (chipToDelete: string) => () => {
    setSelectedDates((prevDates) =>
      prevDates.filter((date) => date.format(TIME_FORMAT) !== chipToDelete)
    );
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('date_picker')}>
        <span>选择日期：</span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Basic date picker"
              onChange={(value: dayjs.Dayjs) => handleChange(value)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className={cn('date_list')}>
        <span>已选日期:</span>
        <div className={cn('chip_list')}>
          {selectedDates.map((date, _) => (
            <Chip
              key={date.format(TIME_FORMAT)}
              label={date.format(TIME_FORMAT)}
              onDelete={handleDelete(date.format(TIME_FORMAT))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
