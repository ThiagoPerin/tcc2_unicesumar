export class PreparacaoMaltesFetches {
	static async fetchPreparacaoMaltesData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/preparacao/malte?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addPreparacaoMaltes(data: any): Promise<any> {
		const res = await fetch(`/api/v1/preparacao/malte`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deletePreparacaoMaltes(data: any): Promise<any> {
		const res = await fetch(`/api/v1/preparacao/malte`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}