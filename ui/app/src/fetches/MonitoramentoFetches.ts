export class MonitoramentoFetches {
	static async fetchMonitoramentoData(numOperacao: string): Promise<any[]> {
		const res = await fetch(`/api/v1/monitoramento?numOperacao=${numOperacao}`);
		return await res.json();
	}

	static async addMonitoramento(data: any): Promise<any> {
		const res = await fetch(`/api/v1/monitoramento`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	static async deleteMonitoramento(data: any): Promise<any> {
		const res = await fetch(`/api/v1/monitoramento`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}
}