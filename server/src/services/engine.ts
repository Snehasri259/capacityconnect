export function gap(current:number,required:number){return Math.max(required-current,0)}
export function priority(g:number,importance:number=1){const weighted=g*importance;return weighted>=15?'High':weighted>=8?'Moderate':'Low'}
export function competency(scores:number[]){if(!scores.length)return 0;return Math.round(scores.reduce((a,b)=>a+b,0)/scores.length)}
export function trainerMatch(subject:number,level:number,experience:number,qualification:number,certification:number,performance:number,feedback:number){return Math.round(subject*.30+level*.20+experience*.15+qualification*.10+certification*.10+performance*.10+feedback*.05)}
export function certificateEligible(courseComplete:boolean,passed:boolean,targetMet:boolean,practical:boolean,approved:boolean){return courseComplete&&passed&&targetMet&&practical&&approved}
