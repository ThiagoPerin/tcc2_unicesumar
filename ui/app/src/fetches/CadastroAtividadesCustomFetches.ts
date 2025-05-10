export class CadastroAtividadesCustomFetches {
	static async fetchCadastroAtividadesCustomData(opAutomatica: boolean, numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/cadastro/atividade/custom${opAutomatica ? `?numOperacao=${numOperacao}` : ""}`);
		return await res.json();
	}

	static async addCadastroAtividadesCustom(data: any): Promise<any> {
		const res = await fetch(`/api/v1/cadastro/atividade/custom`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteCadastroAtividadesCustom(data: any): Promise<any> {
		const res = await fetch(`/api/v1/cadastro/atividade/custom`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}