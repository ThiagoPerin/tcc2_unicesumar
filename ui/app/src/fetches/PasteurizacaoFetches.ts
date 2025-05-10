export class PasteurizacaoFetches {
	static async fetchPasteurizacaoData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/pasteurizacao?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addPasteurizacao(data: any): Promise<any> {
		const res = await fetch(`/api/v1/pasteurizacao`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deletePasteurizacao(data: any): Promise<any> {
		const res = await fetch(`/api/v1/pasteurizacao`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}