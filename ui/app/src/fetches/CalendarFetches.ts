export class CalendarFetches {
	static async fetchCalendarData(numOperacao: string | null): Promise<any[]> {
		const res = await fetch(`/api/v1/calendario?numOperacao=${numOperacao}`);
		return await res.json();
	}
}