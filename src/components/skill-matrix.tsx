import { skillGroups } from "@/data/skills";

export function SkillMatrix() {
  return (
    <div className="skill-matrix">
      {skillGroups.map((group) => (
        <div className="skill-matrix__row" key={group.category}>
          <span className="skill-matrix__index">{group.index}</span>
          <h3>{group.category}</h3>
          <div>
            {group.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
