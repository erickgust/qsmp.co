import { Heading } from "../ui/heading";
import { Paragraph } from "../ui/paragraph";
import { links } from "./social-data";
import { SocialMediaItem } from "./social-item";

interface SocialsSectionProps {
  dictionary: Dictionary["socials"];
}

export function SocialsSection({ dictionary }: SocialsSectionProps) {
  return (
    <section className="bg-[#00ADFF] py-16 px-8 bg-blue-pattern" id="socials">
      <div className="max-w-5.5xl md:gap-6 mx-auto flex flex-col md:flex-row">
        <div className="text-white md:flex-[4] md:self-center mb-10 md:mb-0">
          <Heading className="mb-6 text-white">{dictionary.title}</Heading>

          <Paragraph className="block max-w-[40ch] md:text-sm">
            {dictionary.paragraph.first}
            <span className="mt-2 block">{dictionary.paragraph.second}</span>
          </Paragraph>
        </div>

        <aside className="md:flex-[5]">
          <ul className="flex gap-5 gap-y-6 flex-col xs:flex-row xs:flex-wrap justify-stretch sm:justify-start md:justify-end">
            {links.map((link) => (
              <SocialMediaItem
                key={link.url}
                name={link.name}
                icon={link.icon}
                url={link.url}
              />
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
