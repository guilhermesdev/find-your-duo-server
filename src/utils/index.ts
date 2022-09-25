export function getWeekDaysAsArray(weekDaysString: string): number[] {
	return weekDaysString.split(',').map(Number);
}

export function getWeekDaysAsString(weekDays: number[]): string {
	return weekDays.join(',');
}

export function convertHoursStringToMinutes(formattedHours: string): number {
	const [hours, minutes] = formattedHours.split(':').map(Number);

	const hoursInMinutes = hours * 60;

	const totalMinutes = hoursInMinutes + minutes;

	return totalMinutes;
}

export function convertMinutesToHoursString(totalMinutes: number): string {
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	const formattedHours = [hours, minutes]
		.map(String)
		.map(value => value.padStart(2, '0'))
		.join(':');

	return formattedHours;
}
