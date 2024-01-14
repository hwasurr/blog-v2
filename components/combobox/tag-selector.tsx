'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export function TagSelector({
  tags,
  value,
  onSelect,
}: {
  tags: { label: string; value: string }[];
  value: string;
  onSelect: (value: string) => void;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  function handleOpenToggle(): void {
    setOpen((x) => !x);
  }
  return (
    <div>
      <Popover open={open} onOpenChange={handleOpenToggle}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn('w-[200px] justify-between', !value && 'text-muted-foreground')}
          >
            {value ? tags.find((tag) => tag.value === value)?.label : '태그를 필터하세요.'}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="태그를 필터하세요..." className="h-9" />
            <CommandEmpty>아직 등록된 태그가 없습니다.</CommandEmpty>
            <CommandGroup>
              {[{ value: '', label: '필터없음' }].concat(tags).map((tag) => (
                <CommandItem
                  value={tag.label}
                  key={tag.value}
                  onSelect={() => {
                    if (tag.value === value) onSelect('');
                    else onSelect(tag.value);
                    handleOpenToggle();
                  }}
                >
                  {tag.label}
                  <CheckIcon className={cn('ml-auto h-4 w-4', tag.value === value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
