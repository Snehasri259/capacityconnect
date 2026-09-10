import { describe, expect, it } from 'vitest';
import { certificateEligible, competency, gap, priority, trainerMatch } from './engine.js';

describe('Capacity Connect business rules',()=>{
  it('calculates skill gaps',()=>expect(gap(55,80)).toBe(25));
  it('prioritizes large gaps',()=>expect(priority(25)).toBe('High'));
  it('calculates competency deterministically',()=>expect(competency([55,63,73])).toBe(64));
  it('uses transparent trainer weights',()=>expect(trainerMatch(94,90,92,88,95,90,93)).toBe(92));
  it('requires every certificate condition',()=>{expect(certificateEligible(true,true,true,true,true)).toBe(true);expect(certificateEligible(true,true,false,true,true)).toBe(false)});
});
