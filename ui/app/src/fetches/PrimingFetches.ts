export class PrimingFetches {
	static async fetchPrimingData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/priming?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addPriming(data: any): Promise<any> {
		const res = await fetch(`/api/v1/priming`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deletePriming(data: any): Promise<any> {
		const res = await fetch(`/api/v1/priming`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}