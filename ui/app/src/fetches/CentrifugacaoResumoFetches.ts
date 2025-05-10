export class CentrifugacaoResumoFetches {
	static async fetchCentrifugacaoResumoData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/resumo-centrifugacao?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addCentrifugacaoResumo(data: any): Promise<any> {
		const res = await fetch(`/api/v1/resumo-centrifugacao`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteCentrifugacaoResumo(data: any): Promise<any> {
		const res = await fetch(`/api/v1/resumo-centrifugacao`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}