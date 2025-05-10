export class CentrifugacaoFetches {
	static async fetchCentrifugacaoData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/centrifugacao?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addCentrifugacao(data: any): Promise<any> {
		const res = await fetch(`/api/v1/centrifugacao`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteCentrifugacao(data: any): Promise<any> {
		const res = await fetch(`/api/v1/centrifugacao`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}