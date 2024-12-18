'use client';

import React, { useState, ReactNode } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import FloatText from '@/components/floatText';

const cn = classNames.bind(styles);
const TIME_FORMAT = 'YYYY-MM-DD';
const LOCALE = 'zh-cn';

interface BasicDatePickerProps {
  children?: ReactNode;
}

export default function BasicDatePicker({ children }: BasicDatePickerProps) {
  const [selectedDates, setSelectedDates] = useState<dayjs.Dayjs[]>([]);
  const [showFloating, setShowFloating] = useState(false);

  const handleChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      setSelectedDates((prevDates) => {
        const isDateExist = prevDates.some((date) => date.isSame(value, 'day'));
        if (!isDateExist) {
          setShowFloating(true);
          return [...prevDates, value];
        }
        return prevDates;
      });
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={LOCALE}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="挑个日子"
              onChange={(value: dayjs.Dayjs) => handleChange(value)}
              closeOnSelect={false}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className={cn('date_list')}>
        <span>
          <Badge badgeContent={selectedDates.length} color="primary">
            已选日期：
          </Badge>
          {showFloating && (
            <FloatText
              text="+1"
              duration={1000}
              onEnd={() => setShowFloating(false)}
            />
          )}
        </span>
        <div className={cn('chip_list')}>
          {selectedDates.map((date, _) => (
            <Chip
              className={cn('chip_item')}
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
