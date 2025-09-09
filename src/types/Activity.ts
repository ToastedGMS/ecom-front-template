export type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonValue[]
	| { [key: string]: JsonValue };

type MetadataWithName = {
	name: string;
	[key: string]: JsonValue;
};

export type Activity = {
	user: {
		id: number;
		username: string;
	} | null;
	id: number;
	userId: number | null;
	action: string;
	metadata: MetadataWithName;
	timestamp: Date;
};
