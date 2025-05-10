export class Utils {
	static dateFormatter(date: string): string {
		return `${date.slice(8, 10)}/${date.slice(5,7)}/${date.slice(0,4)}`;
	}

	static extrairHoraMinutos(dataString: string): string {
		const partes = dataString.split(':'); 
		if (partes.length >= 2) {
			return partes[0] + ':' + partes[1];
		} else {
			return 'Formato de data inválido';
		}
	}
}