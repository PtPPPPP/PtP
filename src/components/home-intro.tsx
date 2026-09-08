import Link from "next/link";
import { profile } from "@/data/profile";

export function HomeIntro() {
  return (
    <header className="home-intro">
      <p className="home-intro__edition">
        个人作品集 <span>Portfolio & Notes</span>
      </p>
      <p className="home-intro__name" lang="en">
        {profile.englishName}
      </p>
      <div className="home-intro__identity">
        <div>
          <h1>{profile.name}</h1>
          <p className="home-intro__role">{profile.role}</p>
        </div>
        <div className="home-intro__summary">
          <p>{profile.introduction}</p>
          <Link className="text-link" href="#selected-work">
            查看我的作品 <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
