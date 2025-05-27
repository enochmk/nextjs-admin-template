'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
	text: string;
	size?: 'sm' | 'default' | 'lg';
	className?: string;
}

export function CopyButton({ text, size = 'sm', className }: CopyButtonProps) {
	const handleCopy = () => {
		navigator.clipboard.writeText(text);
	};

	return (
		<Button
			variant='ghost'
			size={size}
			className={className}
			onClick={handleCopy}
		>
			<Copy className='h-3 w-3' />
		</Button>
	);
}
