export class ColetaLeveduraFetches {
	static async fetchColetaLeveduraData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/levedura?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addColetaLevedura(data: any): Promise<any> {
		const res = await fetch(`/api/v1/levedura`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteColetaLevedura(data: any): Promise<any> {
		const res = await fetch(`/api/v1/levedura`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}