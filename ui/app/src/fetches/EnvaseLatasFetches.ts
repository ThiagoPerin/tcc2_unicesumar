export class EnvaseLatasFetches {
	static async fetchEnvaseLatasData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/envase/lata?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addEnvaseLatas(data: any): Promise<any> {
		const res = await fetch(`/api/v1/envase/lata`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteEnvaseLatas(data: any): Promise<any> {
		const res = await fetch(`/api/v1/envase/lata`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}