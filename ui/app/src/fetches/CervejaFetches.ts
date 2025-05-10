export class CervejaFetches {
	static async fetchCervejaData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/cerveja?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async updateCerveja(data: any): Promise<any> {
		const res = await fetch(`/api/v1/cerveja`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data) // Convert the data object to a JSON string
		});
		return await res.json();
	}
}