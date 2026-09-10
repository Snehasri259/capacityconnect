export type Role='trainee'|'trainer'|'admin';
export type User={id:string;name:string;email:string;role:Role;status:string;organizationId?:string;department:string;jobRole:string;onboardingComplete?:boolean;diagnosticComplete?:boolean;diagnosticTestStatus?:'not_started'|'in_progress'|'completed';approvalRequired?:boolean};
