export class TanqueFetches {
	static async fetchTanqueDashboard(): Promise<any[]> {
		const res = await fetch(`/api/v1/tanque`);
		return await res.json();
	}

	static async fetchTanqueData(): Promise<any[]> {
		const res = await fetch(`/api/v1/tanque/register`);
		return await res.json();
	}

	static async addTanqueRegister(data: any): Promise<any> {
		const res = await fetch(`/api/v1/tanque/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteTanqueRegister(data: any): Promise<any> {
		const res = await fetch(`/api/v1/tanque/register`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async tanqueHistorico(tanque: string): Promise<any[]> {
		const res = await fetch(`/api/v1/tanque/historico?numTanque=${tanque}`);
		return await res.json();
	}
}