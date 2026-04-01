export interface OrderData {
	from: string
	to: string
	weight: number
	volume: number
	cargoType: 'standard' | 'fragile' | 'liquid'
	price: number
}

export type Step = 1 | 2 | 3
