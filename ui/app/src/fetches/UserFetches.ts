export class UserFetches {
	static async fetchUserData(): Promise<any> {
		const res = await fetch(`/api/v1/user/info`);
		return await res.json();
	}
}