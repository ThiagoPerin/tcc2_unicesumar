export class TransferenciaFetches {
	static async fetchTransferenciaData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/transferencia?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addTransferencia(data: any): Promise<any> {
		const res = await fetch(`/api/v1/transferencia`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteTransferencia(data: any): Promise<any> {
		const res = await fetch(`/api/v1/transferencia`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}