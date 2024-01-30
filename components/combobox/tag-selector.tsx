'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useTagFilterStore } from '@/store/tag-filter-store';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

export function TagSelector(): JSX.Element {
  const { selectedTag } = useTagFilterStore.getState();
  const [open, setOpen] = useState(false);
  function handleOpenToggle(): void {
    setOpen((x) => !x);
  }

  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);
  useEffect(() => {
    const getTags = async (): Promise<void> => {
      // const res = await fetch(siteConfig.baseURL + '/api/posts/tags');
      // const _tags = ((await res.json()).data || []) as TagsResponseData['data'];
      // setTags(_tags.map((t) => ({ label: t, value: t })));
    };
    getTags();
  }, []);

  return (
    <div>
      <Popover open={open} onOpenChange={handleOpenToggle}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn('w-[200px] justify-between', !selectedTag && 'text-muted-foreground')}
          >
            {selectedTag ? tags.find((tag) => tag.value === selectedTag)?.label : '태그를 필터하세요.'}
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
                    if (tag.value === selectedTag) useTagFilterStore.setState({ selectedTag: '' });
                    else useTagFilterStore.setState({ selectedTag: tag.value });
                    handleOpenToggle();
                  }}
                >
                  {tag.label}
                  <CheckIcon
                    className={cn('ml-auto h-4 w-4', tag.value === selectedTag ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
