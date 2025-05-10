export class CadastroCervejaFetches {
	static async fetchCadastroCervejaData(): Promise<any[]> {
		const res = await fetch(`/api/v1/cadastro/cerveja`);
		return await res.json();
	}

	static async addCadastroCerveja(data: any): Promise<any> {
		const res = await fetch(`/api/v1/cadastro/cerveja`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteCadastroCerveja(data: any): Promise<any> {
		const res = await fetch(`/api/v1/cadastro/cerveja`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}