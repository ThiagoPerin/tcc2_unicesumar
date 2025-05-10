export class MedicaoPhFetches {
	static async fetchMedicaoPhData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/ph?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addMedicaoPh(data: any): Promise<any> {
		const res = await fetch(`/api/v1/ph`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteMedicaoPh(data: any): Promise<any> {
		const res = await fetch(`/api/v1/ph`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}