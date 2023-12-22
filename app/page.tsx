import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Dashboard from "@/components/Dashboard/Dashboard";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center">
			<Dashboard />
		</section>
	);
}
