export class CadastroAtividadesDefaultFetches {
	static async fetchCadastroAtividadesDefaultData(): Promise<any[]> {
		const res = await fetch(`/api/v1/cadastro/atividade`);
		return await res.json();
	}

	static async addCadastroAtividadesDefault(data: any): Promise<any> {
		const res = await fetch(`/api/v1/cadastro/atividade`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteCadastroAtividadesDefault(data: any): Promise<any> {
		const res = await fetch(`/api/v1/cadastro/atividade`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}