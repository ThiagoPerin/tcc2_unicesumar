export class DashboardFetches {
	static async fetchDashboardDonutOp(): Promise<any[]> {
		const res = await fetch(`/api/v1/dashboard/donut/op`);
		return await res.json();
	}

	static async fetchDashboardDonutLatas(): Promise<any[]> {
		const res = await fetch(`/api/v1/dashboard/donut/latas`);
		return await res.json();
	}

	static async fetchDashboardBarOp(): Promise<any[]> {
		const res = await fetch(`/api/v1/dashboard/bar/op`);
		return await res.json();
	}
	
	static async fetchDashboardLatasDetalhado(): Promise<any[]> {
		const res = await fetch(`/api/v1/dashboard/donut/latas/detalhado`);
		return await res.json();
	}
}