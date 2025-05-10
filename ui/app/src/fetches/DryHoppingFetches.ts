export class DryHoppingFetches {
	static async fetchDryHoppingData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/dryhopping?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addDryHopping(data: any): Promise<any> {
		const res = await fetch(`/api/v1/dryhopping`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteDryHopping(data: any): Promise<any> {
		const res = await fetch(`/api/v1/DryHopping`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}