import { siGithub } from "simple-icons";
import { IconLinkButton } from "@/lib/components/composites/external-link-button/icon-link-button";
import { SimpleIcon } from "@/lib/components/composites/icons/simple-icon";

type GithubLinkButtonProps = {
  owner: string;
  repo: string;
};

export function GithubLinkButton({ owner, repo }: GithubLinkButtonProps) {
  return (
    <IconLinkButton
      href={`https://github.com/${owner}/${repo}`}
      icon={<SimpleIcon title="GitHub" path={siGithub.path} />}
    />
  );
}
