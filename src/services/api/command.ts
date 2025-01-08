import { fetchCommands } from './api';
import { Command, Option } from './api.types';
import https from 'https';
import sizeOf, { imageSize } from 'image-size';

const MAX_BYTES_TO_GET_FROM_IMAGE = 2372;

const isParentCommand = (options: Option[]) =>
  options?.some((option) => option.type === 1 || option.type === 2) ?? false;

const extractSubcommands = (data: Command[], locale: string): Command[] => {
  return data.reduce<Command[]>((commands, command) => {
    function extractOptions(parent: string, options: Option[], originalParent: string): Option[] {
      const newOptions: Option[] = [];

      for (const index in options) {
        const option = options[index];
        const optionName = option.nameLocalizations?.[locale] ?? option.name;
        const optionDesc = option.descriptionLocalizations?.[locale] ?? option.description;

        const subName = `${parent} ${optionName}`;
        const originalSubName = `${originalParent} ${option.name}`;

        if (option.type === 2) {
          extractOptions(subName, option.options, originalSubName);
        } else if (option.type === 1) {
          const subcommand = {
            ...command,
            description: optionDesc,
            name: subName,
            originalName: originalSubName,
            choices:
              option?.choices?.map((a) => ({
                ...a,
                name: a.nameLocalizations?.[locale] ?? a.name,
              })) ?? [],
            options: extractOptions(subName, option.options, originalSubName),
          };

          commands.push(subcommand);
        } else {
          newOptions.push({
            ...option,
            originalName: option.name,
            name: optionName,
            description: optionDesc,
            choices:
              option?.choices?.map((a) => ({
                ...a,
                name: a.nameLocalizations?.[locale] ?? a.name,
              })) ?? [],
          });
        }
      }

      return newOptions;
    }

    const cmdName = command.nameLocalizations?.[locale] ?? command.name;

    if (isParentCommand(command.options)) {
      extractOptions(cmdName, command.options, command.name);
    } else {
      const cmd: Command = {
        ...command,
        name: cmdName,
        originalName: command.name,
        description: command.descriptionLocalizations?.[locale] ?? command.description,
        options: extractOptions(cmdName, command.options, command.name),
      };
      commands.push(cmd);
    }

    return commands;
  }, []);
};

const getDimensions = async (command: Command): Promise<{ height: number; width: number }> => {
  try {
    const dimensions = sizeOf(
      `public/examples/${command.category}/${command.originalName.replaceAll(' ', '_')}.gif`,
    );

    return { height: dimensions.height ?? 0, width: dimensions.width ?? 0 };
  } catch (e) {
    return new Promise((res) => {
      let bytesRead = 0;
      const chunks: Uint8Array[] = [];

      https.get(
        `https://menherabot.xyz/examples/${command.category}/${command.originalName.replaceAll(
          ' ',
          '_',
        )}.gif`,
        (response) => {
          response.on('data', (chunk) => {
            bytesRead += chunk.length;
            chunks.push(chunk);

            if (bytesRead >= MAX_BYTES_TO_GET_FROM_IMAGE) {
              response.destroy();

              try {
                const imageData = Buffer.concat(chunks);
                const dimensions = imageSize(imageData);

                res({ height: dimensions.height ?? 0, width: dimensions.width ?? 0 });
              } catch {
                console.log(`Command GIF example not found: ${command.originalName}`);
                res({ height: 0, width: 0 });
              }
            }
          });
        },
      );
    });
  }
};

export async function getCommands(locale: string): Promise<Command[]> {
  const commands = await fetchCommands();
  const extractedCommands = extractSubcommands(commands, locale);

  const extractedCommandsWithExtraInfos = await Promise.all(
    extractedCommands.map(async (command) => {
      const dimensions = await getDimensions(command);

      return {
        ...command,
        dimensions,
      };
    }),
  );

  return extractedCommandsWithExtraInfos;
}
