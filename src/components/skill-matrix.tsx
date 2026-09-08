import { skillGroups } from "@/data/skills";

export function SkillMatrix() {
  return (
    <div className="skill-matrix">
      {skillGroups.map((group) => (
        <div className="skill-matrix__row" key={group.category}>
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
