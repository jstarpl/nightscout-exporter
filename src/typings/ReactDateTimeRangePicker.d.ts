declare module "@wojtekmaj/react-datetimerange-picker" {
	import * as React from 'react'

	interface IDateTimeRangePickerProps {
		amPmAriaLabel?: string;
		calendarAriaLabel?: string;
		calendarClassName?: string | string[];
		calendarIcon?: string | React.ReactElement;
		clearAriaLabel?: string;
		clearIcon?: string | React.ReactElement;
		clockClassName?: string | string[];
		className?: string | string[];
		dayAriaLabel?: string;
		disabled?: boolean;
		disableClock?: boolean;
		format?: string;
		hourAriaLabel?: string;
		isCalendarOpen?: boolean;
		isClockOpen?: boolean;
		locale?: string;
		maxDate?: Date;
		maxDetail?: "month" | "year" | "decade" | "century";
		minDate?: Date;
		minDetail?: "month" | "year" | "decade" | "century";
		minuteAriaLabel?: string;
		monthAriaLabel?: string;
		name?: string;
		nativeInputAriaLabel?: string;
		onCalendarClose?: () => void;
		onCalendarOpen?: () => void;
		onChange?: (value: Date[]) => void;
		onClockClose?: () => void;
		onClockOpen?: () => void;
		required?: boolean
		secondAriaLabel?: string
		showLeadingZeros?: boolean
		value?: Date[];
		yearAriaLabel?: string
	}

	export default class DateTimeRangePicker extends React.Component<IDateTimeRangePickerProps> {
	
	}
}