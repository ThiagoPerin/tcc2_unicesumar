export class OpFetches {
	static async fetchOpData(): Promise<any[]> {
		const res = await fetch(`/api/v1/odp`);
		return await res.json();
	}

	static async addOp(data: any): Promise<any> {
		const res = await fetch('/api/v1/odp', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async editOpInfo(data: any): Promise<any> {
		const res = await fetch(`/api/v1/odp/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async editOpStatus(data: any): Promise<any> {
		const res = await fetch(`/api/v1/odp`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}