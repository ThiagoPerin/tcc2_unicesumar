export class CarbonatacaoFetches {
	static async fetchCarbonatacaoData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/carbonatacao?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addCarbonatacao(data: any): Promise<any> {
		const res = await fetch(`/api/v1/carbonatacao`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteCarbonatacao(data: any): Promise<any> {
		const res = await fetch(`/api/v1/carbonatacao`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}