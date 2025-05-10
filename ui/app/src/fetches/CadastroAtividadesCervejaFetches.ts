export class CadastroAtividadesCervejaFetches {
	static async fetchCadastroAtividadesCervejaData(codigoCerveja: string): Promise<any[]> {
		const res = await fetch(`/api/v1/cadastro/atividade/cerveja?codigoCerveja=${codigoCerveja}`);
		return await res.json();
	}

	static async addCadastroAtividadesCerveja(data: any): Promise<any> {
		const res = await fetch(`/api/v1/cadastro/atividade/cerveja`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteCadastroAtividadesCerveja(data: any): Promise<any> {
		const res = await fetch(`/api/v1/cadastro/atividade/cerveja`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}