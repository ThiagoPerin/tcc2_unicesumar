export class BrassagemFetches {
	static async fetchBrassagemData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/brassagem?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addBrassagem(data: any): Promise<any> {
		const res = await fetch(`/api/v1/brassagem`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteBrassagem(data: any): Promise<any> {
		const res = await fetch(`/api/v1/brassagem`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}