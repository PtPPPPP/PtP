import Link from "next/link";
import { profile } from "@/data/profile";

export function HomeIntro() {
  return (
    <header className="home-intro">
      <div className="home-intro__identity">
        <h1>{profile.name}</h1>
        <p className="home-intro__name" lang="en">
          {profile.englishName}
        </p>
      </div>
      <div className="home-intro__summary">
        <p className="home-intro__role">{profile.role}</p>
        <p>{profile.introduction}</p>
        <Link className="text-link" href="#selected-work">
          查看我的作品 <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </header>
  );
}
