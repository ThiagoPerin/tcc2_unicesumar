export class InoculacaoFetches {
    static async fetchInoculacaoData(numOperacao: string): Promise<any[]> {
        const res = await fetch(`/api/v1/inoculacao?numOperacao=${numOperacao}`);
        return await res.json();
    }

    static async addInoculacao(data: any): Promise<any> {
        const res = await fetch(`/api/v1/inoculacao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    static async deleteInoculacao(data: any): Promise<any> {
        const res = await fetch(`/api/v1/inoculacao`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }
}