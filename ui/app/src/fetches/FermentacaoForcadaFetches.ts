export class FermentacaoForcadaFetches {
	static async fetchFermentacaoForcadaData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/fermentacao?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addFermentacaoForcada(data: any): Promise<any> {
		const res = await fetch(`/api/v1/fermentacao`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteFermentacaoForcada(data: any): Promise<any> {
		const res = await fetch(`/api/v1/fermentacao`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}