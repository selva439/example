export class UserRestriction
{
    showParliment :boolean;
    showAssembly :boolean;
    showLimit :boolean;
    showArea :boolean;
    showBooth :boolean;
    assemblyData:any[];
    Areadata:any[];
}
export class AssemblyData
{
    assemblyConstituencyId:string;
    assemblyConstituencyName:string;
}
export class LimitData
{
    assemblyConstituencyId:string;
    assemblyConstituencyName:string;
}
export class PollingStationData
{
    assemblyConstituencyId:string;
    assemblyConstituencyName:string;
}
export class Search
{
    cid: string;
    limits: string;
    psarea:string;
    psid:string;
    category:string;
    type:string;
}

