export class EnvaseBarrilFetches {
	static async fetchEnvaseBarrilData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/envase/barris?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addEnvaseBarril(data: any): Promise<any> {
		const res = await fetch(`/api/v1/envase/barris`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteEnvaseBarril(data: any): Promise<any> {
		const res = await fetch(`/api/v1/envase/barris`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}